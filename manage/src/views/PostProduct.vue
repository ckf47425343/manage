<template>
  <div class="postform">
    <div class="title">发布商品</div>
    <div class="postform_content">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="name">
          <el-input
            v-model="ruleForm.name"
            placeholder="请你输入商品"
          ></el-input>
        </el-form-item>

        <el-form-item label="商品类型" prop="type_id">
          <el-select v-model="ruleForm.type_id" placeholder="请你选择商品类型">
            <el-option
              v-for="item in productType"
              :key="item.id"
              :label="item.title"
              :value="item.typeId"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品图片" prop="img">
          <UploadFile
            :img-src="ruleForm.img"
            @upload="uploadVal($event, 'img')"
          ></UploadFile>
        </el-form-item>
        <el-form-item label="详情图片" prop="detail_img">
          <UploadFile
            :img-src="ruleForm.detail_img"
            @upload="uploadVal($event, 'detail_img')"
          ></UploadFile>
        </el-form-item>
        <el-form-item label="商品价钱" prop="price">
          <el-input
            v-model="ruleForm.price"
            class="price_input"
            placeholder="请你输入商品价格"
          >
          <template slot="append">元/斤</template>
          </el-input>
        </el-form-item>
        <el-form-item label="库存量" prop="save_count">
          <el-input
            v-model="ruleForm.save_count"
            class="price_input"
            placeholder="请输入库存总量"
          ></el-input>
        </el-form-item>
    
        <el-form-item label="商品状态" prop="status">
          <el-radio-group v-model="ruleForm.status">
            <el-radio label="上架"></el-radio>
            <el-radio label="下架"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="商品描述" prop="desc">
          <el-input type="textarea" v-model="ruleForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="postProduct('ruleForm')"
            >提交商品</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import "../assets/less/post_form.less";
import UploadFile from "../components/UploadFile.vue";
export default {
  name: "PostProduct",
  created() {
    let pid = this.$route.query.pid;
    if (pid) {
      //获取pid
      this.pid = pid;
    
      this.title = "商品详情";
      //通过id查询商品
      this.getProductById(pid);
    } else {
      this.title = "发布商品";
    }
    this.getTypeData();
    console.log("query==>", this.$route);
  },
  data() {
    return {
      
      //标题
      title: "",
      //商品类型
      productType: [],
      //记录商品pid
      pid: "",
      ruleForm: {
        name: "",
        type_id: "",
        price: "",
        status: "",
        save_count:"",
        desc: "",
        img: "",
        detail_img: "",
      },
      //获取商品数据
      copyRuleForm:{},
      //图片类型
      types: {
        imgType: "",
        detailImgType: "",
      },
      rules: {
        name: [{ required: true, message: "请输入活动名称", trigger: "blur" }],
        type: [
          { required: true, message: "请选择商品类型", trigger: "change" },
        ],
        price: [
          { validator: this.validfomat, required: true, trigger: "change" },
        ],
        img: [{ required: true, message: "请上传图片", trigger: "change" }],
        detail_img: [
          { required: true, message: "请上传详情图片", trigger: "change" },
        ],
        save_count:[{validator: this.validfomat, required: true,trigger: "change" }],
        status: [
          { required: true, message: "请选择商品状态", trigger: "change" },
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }],
      },
    };
  },

  methods: {
    getTypeData() {
      console.log(this);
      this.axios({
        method: "GET",
        url: this.baseUrl + "/type",
      })
        .then((result) => {
          console.log("res==>", result);
          if (result.data.status == 1050) {
            this.productType = result.data.result;
          }
        })
        .catch((error) => {
          console.log("err=>", error);
        });
    },
    validfomat(rule, value, callback) {
      console.log(value,rule)
      let reg = /(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
      if (!value) {
           return  callback(new Error("不能为空"));
      }
      console.log(reg.test(value));
      if (!reg.test(value)) {
        return callback(new Error("格式错误"));
      } else {
        callback();
      }
    },
    postProduct(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.pid) {
            this.update();
          } else {
            this.post();
          }
        } else {
          return false;
        }
      });
    },
    post() {
       let product=Object.assign({},this.ruleForm,this.types)
          
          product.img=product.img.replace(/data:image\/[a-z]+;base64,/,'')
          product.detail_img=product.detail_img.replace(/data:image\/[a-z]+;base64,/,'')
         
         
          this.axios({
            method: "POST",
            url: this.baseUrl + "/postProduct",
            data: product,
            headers: {
              token: document.cookie,
            },
          })
            .then((result) => {
              
              if(result.data.status==1034){
              this.$message({
                message:result.data.msg,
                type:'error'
              })
              setTimeout(()=>{
                this.$router.push({name:'Login'})
              },1000)
            }
            if(result.data.status==1060){
             
               this.$message({
                message:result.data.msg,
                type:'success'
              })
              this.ruleForm={}
            }
            if(result.data.status==1061){
                this.$message({
                message:result.data.msg,
                type:'error'
              })
            }
            })
            .catch((err) => {
              console.log(err);
            });
    },
    update(){
      
         let data={}
          
          for(let key in this.ruleForm){
             if(!(this.ruleForm[key]==this.copyRuleForm[key])){
                  data[key]=this.ruleForm[key]
             }
            }
          if(data.img){
             data.img=data.img.replace(/data:image\/[a-z]+;base64,/,'')
             data.imgType=this.types.imgType
          }
          if(data.detail_img){
             data.detail_img=data.detail_img.replace(/data:image\/[a-z]+;base64,/,'')
             data.detailImgType=this.types.detailImgType
 
          }


       //商品没有更新就拦截
        if(JSON.stringify(data)!="{}"){
           data.pid=this.pid
        }else{
         
          return this.$message({
              message: '你尚未更改商品信息',
              type: 'warning'
          })
        }
        
          this.axios({
            method: "POST",
            url: this.baseUrl + "/updateProduct",
            data,
            headers: {
              token: document.cookie,
            },
          })
            .then((result) => {
               
              if(result.data.status==1034){
              this.$message({
                message:result.data.msg,
                type:'error'
              })
              setTimeout(()=>{
                this.$router.push({name:'Login'})
              },1000)
            }
               if(result.data.status==1100){
                 this.$message({
                   message:result.data.msg,
                   type:'success'
                 })
                 this.getProductById(this.pid);
               }
            })
            .catch((error) => {
              console.log("test")
             this.$message({
               message:'商品更新失败',
               type:'error'
             })
            });
    },
    uploadVal(e, type) {
      console.log("type=>", type);
      console.log("e==>", e);

      if (type == "img") {
        console.log(e.base64);
        this.ruleForm.img = e.base64;
        this.types.imgType = e.type;
      } else {
        this.ruleForm.detail_img = e.base64;
        this.types.detailImgType = e.type;
      }
    },
    getProductById(pid) {
      this.axios({
        method: "GET",
        url: this.baseUrl + "/probyid",
        params: {
          pid,
        },
        headers: {
          token: document.cookie,
        },
      })
        .then((result) => {
          console.log("result===>", result.data);
          if(result.data.status==1034){
              this.$message({
                message:result.data.msg,
                type:'error'
              })
              setTimeout(()=>{
                this.$router.push({name:'Login'})
              },1000)
            }

          if (result.data.status == 1070) {
            let url = result.data.url;
            let data = result.data.result[0];
            data.img = url + "/" + data.img;
            data.detail_img = url + "/" + data.detail_img;
            
            for (let key in this.ruleForm) {
              this.ruleForm[key] = data[key];
            }
          //把商品数据复制一份出来
            this.copyRuleForm=Object.assign({},this.ruleForm)
            console.log("data==>", data);
          }
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  },
  components: {
    UploadFile,
  },
};
</script>

<style lang="less" scoped>
</style>