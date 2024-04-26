import { Link, useNavigate } from 'react-router-dom'
import { Card, Breadcrumb, Form, Button, Radio, DatePicker, Select } from 'antd'
import locale from 'antd/es/date-picker/locale/zh_CN'
// 导入资源
import { Table, Tag, Space,Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import img404 from '@/assets/error.png'
import { useEffect, useState } from 'react'
import {getArticleListAPI,deleteAticleAPI} from '@/api/article'
import { useChannel } from '@/hooks/useChannel'
const { Option } = Select
const { RangePicker } = DatePicker

const Article = () => {
  const navigate = useNavigate()
  const tagStatus = {
    1:  <Tag color="warning">待审核</Tag>,
    2:  <Tag color="success">审核通过</Tag>,
  }
  // 准备列数据
  const columns = [
    {
      title: '封面',
      dataIndex: 'cover',
      width: 120,
      render: cover => {
        return <img src={cover.images[0] || img404} width={80} height={60} alt="" />
      }
    },
    {
      title: '标题',
      dataIndex: 'title',
      width: 220
    },
    {
      title: '状态',
      dataIndex: 'status',
      render: data => tagStatus[data]
    },
    {
      title: '发布时间',
      dataIndex: 'pubdate'
    },
    {
      title: '阅读数',
      dataIndex: 'read_count'
    },
    {
      title: '评论数',
      dataIndex: 'comment_count'
    },
    {
      title: '点赞数',
      dataIndex: 'like_count'
    },
    {
      title: '操作',
      render: data => {
        return (
          <Space size="middle">
            <Button onClick={()=> navigate(`/publish?id=${data.id}`)} type="primary" shape="circle" icon={<EditOutlined />} />
            <Popconfirm
              title="确认删除该条文章吗?"
              onConfirm={() => onDelete(data)}
              okText="确认"
              cancelText="取消"
              >
                <Button
                  type="primary"
                  danger
                  shape="circle"
                  icon={<DeleteOutlined />}
                />
            </Popconfirm>  
          </Space>
        )
      }
    }
  ]
  // 准备表格body数据
  const data = [
    {
      id: '8218',
      comment_count: 0,
      cover: {
        images: [],
      },
      like_count: 0,
      pubdate: '2019-03-11 09:00:00',
      read_count: 2,
      status: 2,
      title: 'wkwebview离线化加载h5资源解决方案'
    }
  ]
  // 准备筛选数据参数
  const [reqData, setReqData] = useState({
    status: '',
    channel_id: '',
    begin_pubdate: '',
    end_pubdate: '',
    page: 1,
    per_page:4
  })
  // 准备频道列表
  const {channelList} = useChannel()
  // 渲染表格
  const [article, setArticleList] = useState({
    list: [],
    count: 0
})
useEffect(() => {
  async function getData(){
    const res = await getArticleListAPI(reqData)
    const { results, total_count } = res.data
    setArticleList({
      list: results,
      count: total_count
    })
  }
  getData()
}, [reqData])
  // 筛选
  const onFinish = (values) =>{
    setReqData({
      ...reqData,
      status: values.status,
      channel_id: values.channel_id,
      begin_pubdate: values.date[0].format('YYYY-MM-DD'),
      end_pubdate: values.date[1].format('YYYY-MM-DD'),
    })
    console.log(reqData);
  }
  // 分页
  const pageChange = (page) => {
    setReqData({
      ...reqData,
      page
    })
  }
  // 删除
  const onDelete = async (data) => {
    await deleteAticleAPI(data.id)
      // 更新列表
      setReqData({
        ...reqData,
        page: 1,
        per_page: 10
      })
  }
  return (
    <div>
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '文章列表' },
          ]} />
        }
        style={{ marginBottom: 20 }}
      >
        <Form initialValues={{ status: '' }} onFinish={onFinish}>
          <Form.Item label="状态" name="status">
            <Radio.Group>
              <Radio value={''}>全部</Radio>
              <Radio value={0}>草稿</Radio>
              <Radio value={2}>审核通过</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item label="频道" name="channel_id">
            <Select
              placeholder="请选择文章频道"
              style={{ width: 120 }}
            >
              {channelList.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
            </Select>
          </Form.Item>

          <Form.Item label="日期" name="date">
            {/* 传入locale属性 控制中文显示*/}
            <RangePicker locale={locale}></RangePicker>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" style={{ marginLeft: 40 }}>
              筛选
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Card title={`根据筛选条件共查询到 ${article.count} 条结果：`}>
      <Table rowKey="id" columns={columns} dataSource={article.list} pagination={{
      current:reqData.page,
      pageSize:reqData.per_page,
      onChange: pageChange,
      total: article.count
    }} />
      </Card>
    </div>
  )
}

export default Article