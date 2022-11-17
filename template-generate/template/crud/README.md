# Crud文档

## 实例

```vue

<script>export default {name: 'index',}</script>
<script setup>
import Crud from '@/**/Crud'
</script>
<template>
  <type-business-platform menuCode="brainstorming" modeCode="costSaving"/>
</template>

<style scoped></style>
```

## 参数说明

### Options

|     属性     |     描述     |  默认值  |
|:----------:|:----------:|:-----:|
| isSelected | 开启选择单挑数据功能 | false |

## 事件

### Event

|     属性     |               描述               |      默认值      |
|:----------:|:------------------------------:|:-------------:|
| waySelected | 返回当前选择行数据对象,当isSelected=true有效 | {id:'',name:''} |
