'use strict';

/**
 * matiasgimenez.me Grunfile
 *
 * :: Init Setup ::
 * Install depencencies
 * $ npm install
 * 
 * :: Development Setup ::
 * Run local web server
 * $ grunt server
 * Navigate
 * http://localhost:9001
 *
 * :: Building Setup ::
 * Create deliverable files
 * $ grunt build
 *
 * :: Deploing Setup ::
 * Deploy deliverable files to gh-pages branch
 * $ grunt deploy
 *
 */
 
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

        compass: {
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

        connect: {
            server: {
                options: {
                    port: 9001,
                    hostname: 'localhost',
                    base: 'src',
                    protocol: 'http'
                }
            }
        },

        'gh-pages': {
            options: {
                base: 'build'
            },
            src: ['**']
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
    grunt.loadNpmTasks('grunt-gh-pages');

    // Default task.
    grunt.registerTask('server', ['connect', 'compass:dist', 'watch']);
    grunt.registerTask('build', ['compass:dist', 'cssmin', 'uglify', 'copy', 'processhtml:build']);
    grunt.registerTask('deploy', ['build', 'gh-pages']);

};
