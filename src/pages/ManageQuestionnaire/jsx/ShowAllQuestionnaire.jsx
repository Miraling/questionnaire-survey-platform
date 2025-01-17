// import { deflate } from 'pako'
import React, {Component} from 'react'
import '../css/ShowAllQuestionnaire.css'
import {Table, Space, Button, Input, Menu, Dropdown, message} from 'antd';
import {PlusOutlined, DeleteOutlined, DownOutlined} from '@ant-design/icons';
// import {nanoid} from 'nanoid';
import imgPath from '../../../assets/head.png'
import ViewQuestionnaireDetail from "../../ViewQuestionnaireDetail/jsx/ViewQuestionnaireDetail";
import ModifyPassword from "../../Login/jsx/ModifyPassword"
import copy from 'copy-to-clipboard'
import timeConversion from "../../../utils/TimeConversion"
//搜索框的
const {Search} = Input;
const onSearch = value => alert('value');

//   const expandable = { expandedRowRender: record => <p>{record.description}</p> };
//   const title = () => 'Here is title';
const showHeader = true;
const pagination = {position: 'bottom'};
// const rowId = -1;
//分页
// function showTotal(total) {
// return `Total ${total} items`;
// }

export default class PageList extends Component {
    state = {
        size: 'large',
        // yScroll: true,
        bordered: false,
        loading: false,
        pagination,
        // size: 'default',
        title: undefined,
        showHeader,
        rowSelection: {},
        scroll: undefined,
        hasData: true,
        tableLayout: undefined,
        top: 'none',
        bottom: 'bottomRight',
        data: [],
        tempData: [],
        rowId: -1,
        selectedRowKeys: [],
        modalVisible: false,
        username: ''
    };
    //table的每一列

    ItemonClick = ({key}) => {
        if (`${key}` === '1') {
            this.props.history.push('/modifypassword?username=' + this.state.username
            )
        }
        if (`${key}` === '2') {
            this.props.history.push('/login')
        }
    };

    //搜索
    onSearch = (value) => {
        console.log(369520, this.state.data)
        let dataSearch = []
        for (const d in this.state.data) {
            dataSearch.push(this.state.data[d])
        }
        // let oldData = dataSearch;
        // console.log(33,dataSearch);
        for (let i = 0; i < dataSearch.length; i++) {
            if (dataSearch[i] == null || !dataSearch[i].title.includes(value)) {
                dataSearch.splice(i, 1);
                i--;
            }
        }
        this.setState({
            tempData: dataSearch
        })
        // console.log('oldData',oldData);
    }

    //发送请求
    componentDidMount() {
        // this.setState({username:decodeURI(this.props.location.search.slice(10))})
        console.log("usernaem",this.state.username);
        this.state.username = decodeURI(this.props.location.search.slice(10));
        fetch('/api/manage?user=' + this.state.username, {
            method: 'get',
            headers: {
                'Accept': 'application/json',
            },
        }).then(res => res.json())
            .then(res => {
                console.log("res",res)
                var newData = []
                res.data.data.map(((item, index) => {
                    newData.push(Object.assign({}, item, {
                        key: item.qid,
                        status: item.status === 0 ? "未发布" : (item.status === 1 ? "发布中" : "已结束"),
                        time: timeConversion(item.time)
                    }))
                }))
                this.setState({data: newData, tempData: newData})
            });
    }

    //单个删除问卷
    handleDelete = () => {
        if (window.confirm('确定删除吗？')) {
            const {data, rowId} = this.state
            const Params = {
                "deleteList": rowId
            };
            fetch('/api/manage/delete', {
                method: 'post',
                body: JSON.stringify(Params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    if (res.code === 1) {
                        const newData = data.filter((dataObj) => {
                            return dataObj.qid !== rowId
                        })
                        this.setState({data: newData,tempData: newData})
                        // console.log("newData",newData);
                        message.info("删除成功！")
                    } else {
                        alert("数据库故障，未删除成功！")
                    }
                });
        }
    }

    //设置每一行的Id
    setRowId = (rowId) => {
        this.setState({rowId: rowId})
    }

    //选中多选框
    onSelectChange = selectedRowKeys => {
        this.setState({selectedRowKeys});
    };

    //批量删除
    multiDelete = (selectedRowKeys) => {
        if (window.confirm('确定删除吗？')) {
            const {data} = this.state
            const Params = {
                "deleteList": selectedRowKeys
            };
            fetch('/api/manage/delete', {
                method: 'post',
                body: JSON.stringify(Params),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(res => res.json())
                .then(res => {
                    if (res.code === 1) {
                        const newData = data.filter((dataObj) => {
                            return !selectedRowKeys.includes(dataObj.key)
                        })
                        this.setState({data: newData,tempData: newData})
                    } else {
                        alert("未选中问卷，删除不成功，请确认已选中问卷！")
                    }
                });
        }
    }

    //创建新问卷
    createNew = () => {
        this.props.history.push("/createpage?username=" + this.state.username);
    }

    handleOnClick = () => {
        this.setState({modalVisible: true})
    }

    handleOk = (status, qid) => {
        console.log(status)
        if (status === "未发布") {
            const params = {
                "qid": qid,
                "start_time": new Date().getTime()
            };
            if (this.props.qid !== "") {
                fetch('api/release', {
                    method: 'post',
                    body: JSON.stringify(params),
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                }).then(res => res.json())
                    .then(res => {
                        if (res.code === 1) {
                            message.success("问卷已发布").then(() => null);
                            window.location.reload()
                        } else {
                            message.error("问卷发布失败，请重试")
                        }
                    })
            }
        } else if (status === "发布中") {
            copy('http://localhost:3000/fillquestionnaire?qid=' + this.state.rowId);
            message.success("问卷链接已拷贝至粘贴板").then(() => null);
            this.setState({modalVisible: false})
        } else {
            this.setState({modalVisible: false})
        }
    }

    handleCancel = () => {
        this.setState({modalVisible: false})
    }

    //查看结果
    handleResult = () => {
        this.props.history.push('/dataanalysis?qid=' + this.state.rowId)
    }

    handleEdit = () => {
        this.props.history.push('/editquestionnaire?qid=' + this.state.rowId)
    }

    handleShare = () => {
      copy('http://localhost:3000/fillquestionnaire?qid=' + this.state.rowId)
      message.success("问卷链接已拷贝至粘贴板").then(() => null)
    }

    render() {
        const {selectedRowKeys, rowId, size, xScroll, yScroll, data, ...state} = this.state;
        const scroll = {};
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
        };
        const menu = (
            <Menu onClick={this.ItemonClick}>
                <Menu.Item key="1">更改密码</Menu.Item>
                <Menu.Item key="2">退出登录</Menu.Item>
            </Menu>
        )
        // const hasSelected = selectedRowKeys.length > 0;
        const columns = [
            {
                title: '问卷名称',
                dataIndex: 'title',
                width: "10%"
            },
            {
                title: '问卷id',
                dataIndex: 'qid',
                width: "10%"
            },
            {
                title: '问卷状态',
                dataIndex: 'status',
                width: "10%",
            },
            {
                sorter: (a, b) => a.age - b.age,
                title: '截止时间',
                dataIndex: 'time',
                width: "35%",
                
            },
            {
                title: '操作问卷',
                key: 'action',
                render: (record) => (
                    <Space size="middle">
                        {/* <span>{{status}}</span> */}
                        <a onClick={() => this.handleDelete()}>删除</a>
                        {record.status == "发布中" ? <a onClick={() => this.handleShare()}>分享</a> : ''}
                        {/* {record.status == "未发布" ? <a onClick={() => this.handleDelete()}>删除</a> : ''} */}
                        {record.status == "未发布" ? <a onClick={() => this.handleEdit()}>编辑问卷</a> : ''}
                        <a onClick={() => this.handleOnClick()}>查看问卷</a>
                        {record.status != "未发布" ?<a onClick={() => this.handleResult()}>查看结果</a>:''}
                    </Space>
                ),
            },
        ];
        const tableColumns = columns

        if (yScroll) {
            scroll.y = 840;
        }
        if (xScroll) {
            scroll.x = '100vw';
        }
        if (xScroll === 'fixed') {
            tableColumns[0].fixed = true;
            tableColumns[tableColumns.length - 1].fixed = 'right';
        }
        return (
            <div>
                <div>
                    <header id="header">
                        <div id="userName">
                            <Dropdown overlay={menu}>
                                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                                    <img src={imgPath} alt="头像"/>{this.state.username}<DownOutlined
                                    style={{fontSize: '14px', padding: '4px'}}/>
                                </a>
                            </Dropdown>
                        </div>
                    </header>
                </div>
                <div id="list">
                    <div id='newQuestion'>
                        <Button id="deleteButton" onClick={() => this.multiDelete(this.state.selectedRowKeys)}
                                type="primary" icon={<DeleteOutlined style={{fontSize: '16px'}}/>}>批量删除</Button>
                        <Button id="addButton" onClick={this.createNew} type="primary" style={{margin: '0 16px'}}
                                icon={<PlusOutlined style={{fontSize: '16px'}}/>}>新建问卷</Button>
                        <div id="searchButton">
                            <Search placeholder="请输入问卷名称搜索" onSearch={this.onSearch} enterButton/>
                        </div>
                    </div>
                    {/* shape="round" */}

                    <Table
                        {...this.state}
                        pagination={{position: [this.state.top, this.state.bottom]}}
                        columns={tableColumns}
                        dataSource={state.hasData ? this.state.tempData : null}
                        scroll={scroll} rowSelection={rowSelection}
                        onRow={(record) => {
                            return {
                                onMouseEnter: () => {
                                    this.setRowId(record.qid)
                                }
                            }
                        }
                        }
                    />
                    <ViewQuestionnaireDetail
                        qid={this.state.rowId}
                        modalVisible={this.state.modalVisible}
                        handleOk={this.handleOk}
                        handleCancel={this.handleCancel}
                    />

                    {/* <Pagination size="small" total={50} showSizeChanger showQuickJumper /> */}
                </div>
            </div>
        )
    }
}

