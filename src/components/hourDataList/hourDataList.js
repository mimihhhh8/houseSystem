import axios from "axios"

export default {
    data() {
        return {
                hourDataList: [],
                columns1: [
                    {   
                        title:'时间',
                        key:'a',
                        render: (h, params) => {
                            return (
                                <span>{params.row.hour}</span>
                            )
                        },
                        width:180
                    },
                    {
                        title: '日期',
                        key: 'b',
                        render:(h,params)=>{
                            return(
                            <span>{params.row.date}</span>
                            )
                        },
                        width:180
                    },
                    {
                        title: '数据类型',
                        key: 'd',
                        render:(h,params)=>{
                            return(
                            <span>{params.row.data_type}</span>
                            )
                        },
                        width:180
                    },
                    {
                        title:'数据状态',
                        key:'e',
                        render:(h,params)=>{
                            if(params.row.date_status==2){
                                return h('div',[
                                    h('Icon',{
                                        props:{
                                            type:'md-heart'
                                        },
                                        style:{
                                            color:'#e54847',
                                            fontSize:'18px'
                                        }
                                    })
                                ])
                            }else{
                                return h('div',[
                                    h('Icon',{
                                        props:{
                                            type:'md-heart'
                                        },
                                        style:{
                                            color:'##2d5231',
                                            fontSize:'18px'
                                        }
                                    })
                                ])  
                            }
                            
                        }
                    }
                ],
                proDate:'',
                laterDate:''

        }



    },
    methods:{
       getData(){
           console.log('love')
       }
    },
    created() {
        axios({
            method: "post",
            url: "/users/list",
            data: {
                page: 1,
                limit: 10
            }
        }).then((data) => {
            this.hourDataList = data.data.data.list;
            console.log(this)
            console.log(this.hourDataList,1111)
            
        })
        this.getData();
        console.log

    },


}