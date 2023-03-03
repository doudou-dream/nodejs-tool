<?php

namespace aliyun_mns;

/**
 * 签名助手 2017/11/19
 *
 * Class SignatureHelper
 */
class SignatureHelper
{
    public $accessKeyId = '';
    public $accessKeySecret = '';
    public $domain = 'dysmsapi.aliyuncs.com';
    public $signName = '';
    public $tempCode = '';
    /**
     * SignatureHelper constructor.
     */
    public function __construct()
    {
        //....
    }

    /**
     fixme 成功返回
    array(5) {
    ["Message"] => string(2) "OK"
    ["RequestId"] => string(36) "DFFD5D4A-304E-4F39-9744-72FA6099C076"
    ["BizId"] => string(20) "224507516603473690^0"
    ["Code"] => string(2) "OK"
    ["captcha"] => int(4833)
    }
     */

    /**
     * $mobileNum 手机号
     * $captcha 验证码
     * fixme actine sms event
     * @return bool|\stdClass
     */
    public function sendSms($mobileNum, $captcha, $temp_body)
    {
        $params = $this->getSmsConfig($mobileNum, $captcha, $temp_body = []);
        // *** 需用户填写部分结束, 以下代码若无必要无需更改 ***
        if (!empty($params["TemplateParam"]) && is_array($params["TemplateParam"])) {
            $params["TemplateParam"] = json_encode($params["TemplateParam"], JSON_UNESCAPED_UNICODE);
        }

        // 此处可能会抛出异常，注意catch
        $content = $this->request(
            $this->accessKeyId,
            $this->accessKeySecret,
            $this->domain,
            $params
        );

        return $content;
    }

    /**
     * 添加
     * 获取短信配置 $temp_body 数组
     * @param string $sms_type fixme: repasswd/login/register/dev
     * @return array
     */
    private function getSmsConfig($mobileNum,  $captcha = '0000', $temp_body = [])
    {
        $parmas = [
            "RegionId" => "cn-hangzhou",
            "Action" => "SendSms",
            "Version" => "2017-05-25",
            "SignName" => $this->signName, // fixme 必填: 短信签名
            'PhoneNumbers' => $mobileNum, // fixme 必填: 短信接收号码
            'TemplateParam' => [], //fixme 可选: 设置模板参数,idea:['code'=>'SMS_61200089','customer'=>'yadan']
            'TemplateCode' => $this->tempCode, //fixme 模板 Code
            'OutId' => '', // fixme 可选: 设置发送短信流水号
            'SmsUpExtendCode' => '', // fixme 可选: 上行短信扩展码, 扩展码字段控制在7位或以下，无特殊需求用户请忽
        ];
        $sms_con['code'] = $captcha; //模板验证码
        $parmas['TemplateParam'] = array_merge($sms_con, $temp_body);
        return $parmas;
    }

    /**
     * 生成签名并发起请求
     *
     * @param $accessKeyId string AccessKeyId (https://ak-console.aliyun.com/)
     * @param $accessKeySecret string AccessKeySecret
     * @param $domain string API接口所在域名
     * @param $params array API具体参数
     * @param $security boolean 使用https
     * @return bool|\stdClass 返回API接口调用结果，当发生错误时返回false
     */
    private function request($accessKeyId, $accessKeySecret, $domain, $params, $security = false)
    {
        $apiParams = array_merge(array(
            "SignatureMethod" => "HMAC-SHA1",
            "SignatureNonce" => uniqid(mt_rand(0, 0xffff), true),
            "SignatureVersion" => "1.0",
            "AccessKeyId" => $accessKeyId,
            "Timestamp" => gmdate("Y-m-d\TH:i:s\Z"),
            "Format" => "JSON",
        ), $params);
        ksort($apiParams);;
        $sortedQueryStringTmp = "";
        foreach ($apiParams as $key => $value) {;
            $sortedQueryStringTmp .= "&" . $this->encode($key) . "=" . $this->encode($value);
        }

        $stringToSign = "GET&%2F&" . $this->encode(substr($sortedQueryStringTmp, 1));

        $sign = base64_encode(hash_hmac("sha1", $stringToSign, $accessKeySecret . "&", true));

        $signature = $this->encode($sign);

        $url = ($security ? 'https' : 'http') . "://{$domain}/?Signature={$signature}{$sortedQueryStringTmp}";

        try {
            $content = $this->fetchContent($url);
            return json_decode($content);
        } catch (\Exception $e) {
            return false;
        }
    }

    /**
     * @param $str
     * @return mixed|string
     */
    private function encode($str)
    {
        $res = urlencode($str);
        $res = preg_replace("/\+/", "%20", $res);
        $res = preg_replace("/\*/", "%2A", $res);
        $res = preg_replace("/%7E/", "~", $res);
        return $res;
    }

    /**
     * @param $url
     * @return mixed
     */
    private function fetchContent($url)
    {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            "x-sdk-client" => "php/2.0.0"
        ));

        if (substr($url, 0, 5) == 'https') {
            curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
            curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        }

        $rtn = curl_exec($ch);

        if ($rtn === false) {
            trigger_error("[CURL_" . curl_errno($ch) . "]: " . curl_error($ch), E_USER_ERROR);
        }
        curl_close($ch);

        return $rtn;
    }
}
