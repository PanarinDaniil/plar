module.exports = function (grunt) {
	grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),

	    htmlmin: {
			dist: { 
				options: {
					removeComments: true,
					collapseWhitespace: true
				},
				files: {
					'index.html': 'index-source.html'
				}
			},
			dev: {
				files: {
					'index.html': 'index-source.html'
				}
			}
		},

	    jshint: {
	      options: {
	        curly: true,
	        eqeqeq: true,
	        immed: true,
	        latedef: true,
	        newcap: true,
	        noarg: true,
	        sub: true,
	        undef: true,
	        eqnull: true,
	        browser: true,
	        globals: {
	          jQuery: true,
	          $: true,
	          console: true
	        }
	      },
	      '<%= pkg.name %>': {
	        src: [ 'src/js/*.js' ]
	      }
	    },

	    uglify: {
	    	options: {
		      compress: {
		        drop_console: false
		      }
		    },
	    	my_target: {
				files: [{
					'js/mousewheel.min.js': ['js/jquery.mousewheel-3.0.6.pack.js'],
					'js/fancybox.min.js'  : ['js/jquery.fancybox.js'],
					'js/fancybox-buttons.min.js'  : ['js/jquery.fancybox-buttons.js'],
					'js/fancybox-media.min.js'  : ['js/jquery.fancybox-media.js'],
					'js/scripts.min.js'   : ['js/scripts.js']
				}]
			}
	    },

	    concat: {
	    	dist: {
	    		src: ['js/jquery-1.11.3.min.js', 'js/jquery.validate.min.js', 'js/mousewheel.min.js', 'js/fancybox.min.js', 'js/fancybox-buttons.min.js', 'js/fancybox-media.min.js', 'js/scripts.min.js'],
	    		dest: 'Scripts/build.js'
	    	}
	    },
 
	    compass: {
		    prod: {
		        src: 'scss',
		        dest: 'styles',
		        forcecompile: false,
		        debugsass: false,
		        linecomments: false
		    }
		},

	    cssmin: {
	    	target: {
	    		files: {
	    			'css/style.min.css' : ['styles/jquery.fancybox.css', 'styles/jquery.fancybox-buttons.css', 'jquery.fancybox-thumbs.css', 'styles/styles.css']
	    		}
	    	}
	    },
 
	    watch: {
	    	html:  {
	    		files: ['index-source.html'],
		    	tasks: ['htmlmin:dev']
	    	},
	    	scripts: {
		    	files: ['js/jquery-1.11.3.min.js', 'js/jquery.validate.min.js', 'js/scripts.js'],
		    	tasks: ['jshint', 'uglify', 'concat']
	    	},
	    	sass: {
		    	files: [ 'scss/*.scss' ],
	    		tasks: [ 'compass' ]
	    	},
	    	css: {
		    	files: ['styles/*.css'],
		    	tasks: ['cssmin']
	    	}
	    }
	});
 
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
 
	grunt.registerTask('default', ['htmlmin:dev', 'jshint', 'uglify', 'concat', 'compass-clean', 'compass', 'cssmin', 'watch']);
};