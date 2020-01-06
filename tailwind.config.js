module.exports = {
  theme: {
    extend: {
      boxShadow: theme => ({
        outline: '0 0 0 2px ' + theme('colors.indigo.500')
      }),
    }
  },
  variants: {
    backgroundColor: ['responsive', 'hover', 'focus', 'group-hover', 'focus-within'],
    textColor: ['responsive', 'hover', 'focus', 'group-hover', 'focus-within'],
    zIndex: ['responsive', 'focus']
  },
  plugins: []
}
