import { usePageData } from '@vuepress/client'

interface PageRef {
  stringLength: number
}

export default function () {
  const page = usePageData<Record<string, PageRef>>()
  setTimeout(() => {
    const footer = document.querySelector('.page-meta')
    const span = document.createElement('span')
    span.innerHTML = '页面字数统计: ' + page.value.stringLength
    span.setAttribute('style', 'display:inline-block;font-weight: 500;color: var(--c-text-lighter);margin:24px 0;')
    console.log('当前页面字数统计:' + page.value.stringLength)

    footer?.appendChild(span)
  }, 1000)
}
