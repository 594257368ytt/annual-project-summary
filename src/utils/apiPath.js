/**
 * @description: 接口环境可修改为根据 window._env_.APP_ENV 来判断
 */
let path = {
  baseUrl: 'http://fn-cloud-visual-configuration.test.fnwintranet.com/',
}
if (
  window.location.href.indexOf('fn-cloud-builder.pre.fnwintranet.com') !== -1 ||
  window.location.href.indexOf('fn-cloud-builderpre.fanneng.com') !== -1
) {
  path.baseUrl = 'http://fn-cloud-visual-configuration.pre.fnwintranet.com/'
} else if (window.location.href.indexOf('builder.fanneng.com') !== -1) {
  path.baseUrl = 'https://fn-cloud-visual-configuration.fanneng.com/'
}
export const apiPath = path
