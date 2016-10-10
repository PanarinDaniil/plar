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

	    uglify: {
	    	options: {
		      compress: {
		        drop_console: false
		      }
		    },
	    	my_target: {
				files: [{
					'js/fancybox.min.js'  : ['js/jquery.fancybox.js'],
					'js/fancybox-buttons.min.js'  : ['js/jquery.fancybox-buttons.js'],
					'js/scripts.min.js'   : ['js/scripts.js']
				}]
			}
	    },

	    concat: {
	    	dist: {
	    		src: ['js/jquery-1.11.3.min.js', 'js/jquery.validate.min.js', 'js/fancybox.min.js', 'js/fancybox-buttons.min.js', 'js/scripts.min.js'],
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
	    			'css/style.min.css' : [ 'styles/styles.css', 'styles/jquery.fancybox.css', 'styles/jquery.fancybox-buttons.css']
	    		}
	    	}
	    },
 
	    watch: {
	    	html:  {
	    		files: ['index-source.html'],
		    	tasks: ['htmlmin:dev']
	    	},
	    	scripts: {
		    	files: ['js/jquery-1.11.3.min.js', 'js/jquery.validate.min.js', 'js/jquery.fancybox.js', 'js/jquery.fancybox-buttons.js', 'js/scripts.js'],
		    	tasks: [ 'uglify', 'concat']
	    	},
	    	sass: {
		    	files: [ 'scss/*.scss' ],
	    		tasks: [ 'compass' ]
	    	},
	    	css: {
		    	files: [ 'styles/styles.css', 'styles/jquery.fancybox.css', 'styles/jquery.fancybox-buttons.css' ],
		    	tasks: ['cssmin']
	    	}
	    }
	});
 
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-compass');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
 
	grunt.registerTask('default', ['htmlmin:dev', 'uglify', 'concat', 'compass-clean', 'compass', 'cssmin', 'watch']);
};