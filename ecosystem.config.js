module.exports = {
  apps : [
    {
      name: 'tools',
      script: 'npm',
      args: 'start',
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
