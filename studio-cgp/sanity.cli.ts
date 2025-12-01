import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
    api: {
        projectId: 'lftmpe5q',
        dataset: 'production'
    },
    studioHost: 'chartgoldprice',
    deployment: { // <--- Start of the new block
      appId: 'r38doqfby19gvv2t3k1zbfwt', // <--- Your new App ID
    } // <--- End of the new block
})