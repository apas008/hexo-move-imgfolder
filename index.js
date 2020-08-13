'use strict';
const fs   = require('hexo-fs')
const path = require('path')
//  move folder
hexo.extend.filter.register('before_post_render', function(data){
        fs.readdir('./source/_posts/images', function(err, files) {
        if (err) {
            console.log("no this subfoler",err)
        }
        // files是一个数组
        // 每个元素是此目录下的文件或文件夹的名称
       
           files.forEach(function(file) {
             var srcPath = path.join('./source/_posts/images', file)
             var tarPath = path.join('./source/images', file)
       
             fs.stat(srcPath, function(err, stats) {
               if (stats.isDirectory()) {
                 console.debug('mkdir', tarPath)
                 fs.mkdir(tarPath, function(err) {
                   if (err) {
                    //  console.log("no this subfoler",err)
                     return
                   }
                   return
                //    fs.copyFile(srcPath, tarPath)
                 })
               } else {
                 fs.copyFile(srcPath, tarPath)
               }
             })
           })
       
           //为空时直接回调
           files.length === 0 && cb && cb()
         })
  

// ======================================================================================================
//modify relative path for img
   
    data.content = data.content.replace(/!{1}\[([^\[\]]*)\]\((\S*)\s?(?:".*")?\)/g,
        function(match_str, label, path){

            // if only one /
            if( (path.split("/")).length == 3){
             
                var defineroot = '../../../.'
                var newpath = defineroot + path
                var output =`![${label}](${newpath})`
                console.debug('np',`![${label}](${newpath})`)
                return output
            }else{
                console.debug("Markdown Image Path does not exists!",path);
                // console.debug(path)
                console.debug("label",(path.split("/"))[2])
                // console.debug(match_str)
                return match_str;
            }

        });
        
    return data;
   
});

