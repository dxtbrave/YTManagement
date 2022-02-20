export const rules = {
    name: [
        {
          required: true,
          message: '账号不得为空',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{5,10}$/,
          message: '账号必须为5~10个字母或者数字',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: '密码不得为空',
          trigger: 'blur'
        },
        {
          pattern: /^[a-z0-9]{3,}$/,
          message: '密码必须为3位以上的字母或者数字~',
          trigger: 'blur'
        }
      ]
}