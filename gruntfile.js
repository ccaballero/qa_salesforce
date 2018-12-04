const path=require('path')

module.exports=function(grunt){
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        shell:{
            latex:{
                command:function(doc){
                    return [
                        'latex -interaction=nonstopmode proyecto.tex'
                      , 'dvipdf proyecto.dvi'
                    ].join(' && ');
                }
            }
        }
      , watch:{
            tex:{
                files:['*.tex']
              , tasks:['shell:latex']
            }
        }
    });

    grunt.event.on('watch',function(action,filepath,target){
        var c=path.parse(filepath);
        grunt.config('watch.tex.tasks','shell:latex:'+c.dir);
    });

    grunt.registerTask('serve',[
        'watch'
    ]);
};

