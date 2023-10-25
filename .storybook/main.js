module.exports = {
  "stories": ['../src/**/**/docs/*.stories.@(js|jsx|ts|tsx)'],
  "addons": ["@storybook/addon-links", "@storybook/addon-essentials"],
  "framework": {
    name: "@storybook/web-components-webpack5",
    options: {}
  },
  docs: {
    autodocs: true
  },
  
  typescript: {
    check: true,
    checkOptions:{
      typescript:{
        configOverwrite:{
          compilerOptions: {
            target: "es2022",
            module: "esnext",
            moduleResolution: "node",
            noEmitOnError: true,
            lib: ["es2022", "dom"],
            strict: true,
            esModuleInterop: true,
            allowSyntheticDefaultImports: true,
            experimentalDecorators: true,
            importHelpers: true,
            sourceMap: true,
            inlineSources: true,
            declaration: true,
            incremental: true,
            skipLibCheck: true,
            useDefineForClassFields: false
          },
        }
      }
    },
  }}