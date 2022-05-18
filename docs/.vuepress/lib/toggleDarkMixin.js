var toggleTimer = null
// function toggleDark() {
//   toggleDark = setInterval(() => {
//     const date = new Date().getHours();
//     if (date == 20 && document.querySelector('html').className != 'dark') {
//       document.querySelector('html').className = 'dark';
//       changeSvgStyle('dark');
//     }
//     if (date == 7 && document.querySelector('html').className != '') {
//       document.querySelector('html').className = '';
//       changeSvgStyle('light');
//     }
//   }, 1000)
// }
// function changeSvgStyle(theme) {
//   const i = theme === 'dark' ? 0 : 1;
//   const btn = document.querySelector('button[title="toggle dark mode"]');
//   btn.childNodes[i].setAttribute('style', 'display:none');
//   btn.childNodes[i ^ 1].setAttribute('style', '');
//   localStorage.setItem('vuepress-color-scheme', theme === 'dark' ? 'dark' : 'auto')
// }
function toggleDark() {
  console.log('自动更新主题已开启')
  toggleTimer = setInterval(() => {
    const date = new Date().getHours()
    if ((date >= 22 || date < 7) && document.querySelector('html').className != 'dark') {
      changeSvgStyle('dark')
    }
    if (date >= 7 && date < 22 && document.querySelector('html').className != '') {
      changeSvgStyle('light')
    }
  }, 1000 * 60)
}
function changeSvgStyle() {
  const btn = document.querySelector('button[title="toggle dark mode"]')
  btn && btn.click()
}
var window = window || {}
if (window && window.addEventListener) {
  window.addEventListener(
    'beforeunload',
    function () {
      console.log('清除缓存')
      toggleTimer && this.clearInterval(toggleTimer)
    },
    false
  )
}

export default function () {
  toggleDark()
}
