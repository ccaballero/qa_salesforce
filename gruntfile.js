const path=require('path');

module.exports=function(grunt){
    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        shell:{
            latex1:{
                command:function(doc){
                    return [
                        'latex -interaction=nonstopmode proyecto'
                      , 'biber proyecto'
                      , 'latex -interaction=nonstopmode proyecto'
                      , 'dvipdf proyecto'
                    ].join(' && ');
                }
            }
          , latex2:{
                command:function(doc){
                    return [
                        'latex -interaction=nonstopmode presentacion'
                      , 'latex -interaction=nonstopmode presentacion'
                      , 'dvipdf presentacion'
                    ].join(' && ');
                }
            }
        }
      , watch:{
            tex1:{
                files:[
                    'apendice_*.tex'
                  , 'bibliografia.bib'
                  , 'capitulo_*.tex'
                  , 'caratula.tex'
                  , 'proyecto.tex'
                  , 'graphics/*.eps'
                ]
              , tasks:['shell:latex1']
            }
          , tex2:{
                files:[
                    'presentacion.tex'
                  , 'graphics/*.eps'
                ]
              , tasks:['shell:latex2']
            }
        }
    });

    grunt.event.on('watch',function(action,filepath,target){
        var c=path.parse(filepath);

        grunt.config('watch.tex1.tasks','shell:latex1:'+c.dir);
        grunt.config('watch.tex2.tasks','shell:latex2:'+c.dir);
    });

    grunt.registerTask('serve',[
        'watch'
    ]);
};

