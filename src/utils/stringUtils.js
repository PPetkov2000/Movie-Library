export const removeHtmlTags = (str) => {
  const div = document.createElement('div')
  div.innerHTML = str
  return div.textContent || ''
}
