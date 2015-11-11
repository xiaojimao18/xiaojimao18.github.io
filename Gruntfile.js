module.exports = function(grunt) {
	grunt.initConfig({
		uglify: {
			options: {
				banner: '/*!<%= grunt.template.today("dd-mm-yyyy") %> */\n',
				sourceMap: true
			},
			dist: {
				files: {
					'js/blog.min.js': ['js/blog.js']
				}
			}
		},
		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.css', '!*.min.css'],
					dest: 'css',
					ext: '.min.css'
				}]
			}
		},
		watch: {
			files: ['js/blog.js', 'css/blog.css', 'css/markdown.css'],
			tasks: ['uglify', 'cssmin']
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.registerTask('default', ['uglify', 'cssmin']);
};