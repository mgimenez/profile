'use strict';

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        cssmin: {
            options: {
                shorthandCompacting: false,
                roundingPrecision: -1
            },
            css: {
                src: ['src/css/*.css'],
                dest: 'build/css/styles.min.css'
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            js: {
                src: ['src/js/*.js'],
                dest: 'build/js/script.min.js'
            }
        },

        copy: {
            assets: {
                files: [
                    // includes files within path 
                    {
                        expand: true,
                        cwd: 'src/assets/',
                        src: ['**'],
                        dest: 'build/assets'
                    }, {
                        expand: true,
                        cwd: 'src/',
                        src: ['*.html'],
                        dest: 'build'
                    }
                ]
            }
        },

        compass: { // Task
            dist: {
                options: {
                    sassDir: 'src/sass',
                    cssDir: 'src/css'
                }
            }
        },

        watch: {
            css: {
                files: ['src/**/*.scss', 'src/js/scrollTo.js'],
                tasks: ['compass:dist', 'jshint'],
                options: {
                    interrupt: true,
                },
            }
        },

        processhtml: {
            build: {
                files: {
                    'build/index.html': ['src/index.html']
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: false,
                forin: true,
                immed: true,
                latedef: true,
                noempty: true,
                nonbsp: true,
                nonew: true,
                undef: true,
                unused: true,
                browser: true,
                devel: true
            },
            files: {
                src: ['src/js/scrollTo.js']
            }
        },

        buildGhPages: {
            ghPages: {
                options: {
                    dist: 'build',
                    pull: false
                }
            }
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: 'src',
                    protocol: 'http'
                }
            }
        }

    });

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-build-gh-pages');

    // Default task.
    grunt.registerTask('server', ['connect', 'compass:dist', 'watch']);
    grunt.registerTask('build', ['compass:dist', 'cssmin', 'uglify', 'copy', 'processhtml:build']);
    grunt.registerTask('deploy', ['build', 'buildGhPages']);

};
