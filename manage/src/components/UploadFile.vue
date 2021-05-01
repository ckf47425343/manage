<template>
    <div class="uploadfile">
        <label class="uploader_box">
         <i class="el-icon-plus"></i>
         <input type="file" class="file_input" @change="upload">
         <img  class="show_position" :src="imgSrc" alt="">
        </label>
    </div>
</template>

<script>
import  '../assets/less/upload_file.less'
    export default {
      name:'UploadFile',
      props:{
        size:{
            type:[String,Number],
              //单位KB
            default:120
           },
        type:{
            type:[Array],
            default(){
            return ['jpg','jpeg','png','gif']
            }
            },
        imgSrc:{
             type:String,
             default:''
        }
        
        
      },
      data() {
        return {
          
        }
      },
      created(){
    
      
      },
      methods: {
          upload(e){
       
         let selt=this
          
          let file=e.target.files[0]
            console.log("test",file)
            //   this.$emit('upload',this.src)
          if(!file){
             return
          }
          //判断图片的格式是否符合
          let type=file.type.split('/')[1]
          if(this.type.indexOf(type)==-1){
              this.target.value=''
             return this.$message({
                 message:`图片格式错误,只能上传${this.type.split(',')}格式的图片`,
                 type:'error'
              })
          }
          //判断图片大小是否合法
          let size=file.size/1024
          if(size>=this.size){
            return this.$message({
                message:`图片大小不能超过${this.size}KB`,
                type:'error'
            })
          }
          
          let fileReader=new FileReader()

          fileReader.onload=function(){
        
           selt.$emit('upload',{base64:this.result,type})
            
          }

          fileReader.readAsDataURL(file)
        
            
          }

        
      },
    }
</script>

<style lang="less" scoped>

</style>