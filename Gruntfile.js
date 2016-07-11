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
                files: 'src/**/*.scss',
                tasks: ['compass:dist'],
                options: {
                    interrupt: true,
                },
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

    // Default task.
    grunt.registerTask('server', ['connect', 'compass:dist', 'watch']);
    grunt.registerTask('build', ['compass:dist', 'cssmin', 'uglify', 'copy']);

};
