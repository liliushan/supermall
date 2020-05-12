/**
 * 
 * 解析分类页面的数据
 * 
 * */

 class parseCategoryData{
   constructor(res){
      this.categoryName = res.data.message.map(value=>value.cat_name)
      this.categoryGoods = res.data.message.map(value=>value.children)
   }
 }
 export {parseCategoryData}