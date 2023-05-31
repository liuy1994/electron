module.exports = {
  packagerConfig: {},
  rebuildConfig: {},
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {},
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  publishers: [
    {
      authToken: "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",
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'liuy1994',
          name: 'electron'
        },
        prerelease: false,
        draft: true
      }
    }
  ]
};
