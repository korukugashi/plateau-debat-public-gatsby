# Plateau-debat-public with GatsbyJS and NetlifyCMS

## Development

Comment `name: git-gateway ; editorial_workflow`, uncomment `name: proxy; proxy_url: http://localhost:8081/api/v1` in file `static/admin/config.yml`

Run `npx netlify-cms-proxy-server` and then `gatsby develop`

Run this command to use Netlify Large Media in your current shell: `source /home/bouchon/.netlify/helper/path.bash.inc`