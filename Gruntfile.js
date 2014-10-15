module.exports = function(grunt) {
	
	var config = {
			dist: 'dist',
			scripts: 'js',
			images: 'img',
			styles: 'css'
	};

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		libsass: {
			options: {
				loadPath: ['bower_components/foundation/scss'],
				sourcemap: true
			},
			files: {
				expand: true,
				cwd: 'scss',
				src: ['**/*.scss', '!**/_*.scss'],
				dest: 'css',
				ext: '.css'
			}
		},

		copy: {
			// dist: {
			// 	files: [
			// 		{
			// 			expand: true,
			// 			dot: true,
			// 			cwd: '<%= yeoman.app %>',
			// 			dest: '<%= yeoman.dist %>',
			// 			src: [
			// 				'*.{ico,png,txt}',
			// 				'.htaccess',
			// 				'*.html',
			// 				'views/{,*/}*.html',
			// 				'images/{,*/}*.{webp}',
			// 				'fonts/*'
			// 			]
			// 		}, 
			// 		{
			// 			expand: true,
			// 			cwd: '.tmp/images',
			// 			dest: '<%= yeoman.dist %>/images',
			// 			src: ['generated/*']
			// 		}, 
			// 		{
			// 			expand: true,
			// 			cwd: 'bower_components/bootstrap/dist',
			// 			src: 'fonts/*',
			// 			dest: '<%= yeoman.dist %>'
			// 		}
			// 	]
			// },
			// styles: {
			// 	expand: true,
			// 	cwd: '<%= yeoman.app %>/styles',
			// 	dest: '.tmp/styles/',
			// 	src: '{,*/}*.css'
			// },
			jsPlugins: {
				expand: true,
				flatten: true,
				src: 'bower_components/modernizr/modernizr.js',
				dest: 'js'
			}
		},

		concat: {
			options: {
				separator: ';\n',
				sourceMap: true
			},
			modernizr: {
				files: {
					'js/modernizr.min.js': ['js/modernizr.js']
				}
			},
			app: {
				files: {
					'js/app.min.js': ['js/app.js']
				}
			},
			plugins: {
				files: {
					'js/plugins.min.js' : [
						'js/plugins/prepend_plugins.js',
						'js/plugins/!{prepend|append}*.js',
						'bower_components/jquery/dist/jquery.js',
						'bower_components/fastclick/lib/fastclick.js',
						'bower_components/foundation/js/foundation.js',
						'js/plugins/append_plugins.js'
					]
				}
			}
		},

		watch: {
			options: {
				livereload: true
			},
			grunt: { files: ['Gruntfile.js'] },

			html: {
				files: [ '**/*.html' ]
			},

			jsApp: {
				files: [ 'js/app.js' ],
				tasks: ['concat:app']
				
			},

			jsPlugins: {
				files: [
					'js/plugins/*.js',
					'bower_components/fastclick/lib/fastclick.js'
				],
				tasks: ['concat:plugins']
				
			},

			libsass: {
				files: ['scss/**/*.scss'],
				tasks: ['libsass']
			}
		},

		// The actual grunt server settings
		connect: {
			options: {
				port: 9000,
				open: true,
				directory: true,
				livereload: 35729,
				hostname: '0.0.0.0'
			},
			livereload: {
                options: {
                    middleware: function(connect) {
                        return [
                            connect.static('.'),
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static("/")
                        ];
                    }
                }
            }
		},

	});

	grunt.loadNpmTasks('grunt-libsass');

	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-connect');

	grunt.registerTask('build', ['copy', 'libsass', 'concat']);
	grunt.registerTask('default', ['build', 'connect:livereload', 'watch']);
}