module.exports = grunt => {
  require('load-grunt-tasks')(grunt)
  grunt.initConfig({
    watch: {
      css: {
        files: ['src/css/*.scss'],
        tasks: ['newer:postcss'],
        options: {
          spawn: false,
          livereload: 8081
        }
      },
      imgs: {
        files: ['src/images/*.{png,jpg,gif}'],
        tasks: ['imagemin'],
        options: {
          spawn: false
        }
      },
      pug: {
        files: ['views/*.pug'],
        options: {
          spawn: false,
          livereload: 8081
        }
      }
    },
    postcss: {
      options: {
        map: {
          inline: false,
          dist: 'dist/css/map/'
        },
        parser: require('postcss-scss'),
        processors: [
          require('precss')(),
          require('postcss-cssnext')({
            warnForDuplicates: false
          }),
          require('cssnano')(),
          require('lost')(),
          require('postcss-strip-inline-comments')()
        ]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'src/css/',
          src: ['*.scss'],
          dest: 'dist/css',
          ext: '.css'
        }]
      }
    },
    pug: {
      compile: {
        options: {
          data: function (dest, src) {
            return require('./config/default.json')
          }
        },
        files: [{
          expand: true,
          cwd: 'src/view',
          src: ['*.pug'],
          dest: 'dist/',
          ext: '.html'
        }]
      }
    },
    imagemin: {
      dynamic: {
        files: [{
          expand: true,
          cwd: 'src/images/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'dist/images/'
        }]
      }
    },
    copy: {
      fonts: {
        files: [{
          expand: true,
          cwd: 'src/fonts',
          src: ['**/*'],
          dest: 'dist/fonts'
        }]
      },
      main: {
        files: [{
          expand: true,
          cwd: 'src/main',
          src: ['*.*'],
          dest: 'dist'
        }]
      }
    }
  })
  grunt.registerTask('default', ['watch'])
  grunt.registerTask('deploy', ['imagemin', 'pug', 'postcss', 'copy'])
}
