<template>
  <div class="hy-form">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item  v-if="!item.isHidden" :label="item.label" :rules="item.rules" :style="itemStyle">
              <template v-if="item.type === 'input' || item.type === 'password'">
                <el-input :placeholder="item.placeholder"
                          v-bind="item.otherOptions"
                          :show-password="item.type === 'password'"
                          :model-value="modelValue[`${item.field}`]"
                          @update:model-value="handleValueChange($event,item.field)"
                />
              </template>
              <template v-else-if="item.type === 'select'">
                <el-select :placeholder="item.placeholder"
                           style="width: 100%"
                           v-bind="item.otherOptions"
                           :model-value="modelValue[`${item.field}`]"
                           @update:model-value="handleValueChange($event,item.field)"
                >
                  <el-option v-for="option in item.options"
                             :value="option.value"
                             :key="option.value">{{ option.title }}
                  </el-option>
                </el-select>
              </template>
              <template v-else-if="item.type === 'datepicker'">
                <el-date-picker style="width: 100%"
                                v-bind="item.otherOptions"
                                :model-value="modelValue[`${item.field}`]"
                                @update:model-value="handleValueChange($event,item.field)"
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, ref, watch} from "vue";
import {IFormItem} from '../types'

export default defineComponent({
  props: {
    modelValue: {
      type: Object,
      require: true
    },
    formItems: {
      type: Array as PropType<IFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({padding: '10px 40px'})
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8, // >1200px 3个
        md: 12, // >992px 2个
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update:modelValue'],
  setup(props, {emit}) {

    const handleValueChange = (value:any,field:string) => {
      emit('update:modelValue',{...props.modelValue,[field]:value})
    }

    return {
      handleValueChange
    };
  },
});
</script>

<style scoped lang="less">
.hy-form {
  padding-top: 22px;

  .form-item {
    padding: 5px 30px;
  }

}
</style>
