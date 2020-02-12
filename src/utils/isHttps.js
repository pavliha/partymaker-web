import url from 'url'

const isHttps = link => link && url.parse(link).protocol === 'https:'

export default isHttps
