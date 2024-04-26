import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select,
  message
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link, useSearchParams } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useEffect, useState } from 'react'
import { useChannel } from '@/hooks/useChannel'
import {getIdArticleAPI, articleSubmitAPI,updateArticleAPI} from '@/api/article'
const { Option } = Select
const Publish = () => {
  const {channelList} = useChannel()

  const onFinish = (formValue) => {
    if (!articleId){
      const { channel_id, content, title } = formValue
      if (imgCount !== imageList.length) return message.error('图片数量不对')
      const params = {
      channel_id,
      content,
      title,
      type: 1,
      cover: {
        type: imgCount,
        images: imageList.map(item=>item.response.data.url)
      }
    }
      articleSubmitAPI(params)
    }else {
      const { channel_id, content, title } = formValue
      if (imgCount !== imageList.length) return message.error('图片数量不对')
      const params = {
        channel_id,
        content,
        title,
        type: 1,
        cover: {
          type: imgCount,
          images: imageList.map(item => {
            if (item.response) {
              return item.response.data.url
            } else {
              return item.url
            }
          })
        }
      }
      updateArticleAPI(articleId,params)
    }
  }

  const [imageList, setImageList] = useState([])
  const onUploadChange = (info) => {
    setImageList(info.fileList)
  }

  const [imgCount, setImgCount] = useState(1)
  const onTypeChange = (e) => {
    setImgCount(e.target.value)
    setImageList([])
  }

  const [searchParams] = useSearchParams()
  const articleId = searchParams.get('id')
  const [form] = Form.useForm()
  useEffect(() => {
    async function getArticle () {
      const res = await getIdArticleAPI(articleId)
      const { cover, ...formValue } = res.data
      // 设置表单数据
      form.setFieldsValue({...formValue, type:cover.type})
      setImgCount(cover.type)
      setImageList(cover.images.map(url => ({ url: url })))
    }
    if (articleId) {
      // 拉取数据回显
      getArticle()
    }
  }, [articleId, form])

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: `${articleId ? '更新文章' : '发布文章' }` },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 1 }}
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* 选项 */}
              {channelList.map(item => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
      <Form.Item name="type">
        <Radio.Group onChange={onTypeChange}>
          <Radio value={1}>单图</Radio>
          <Radio value={3}>三图</Radio>
          <Radio value={0}>无图</Radio>
        </Radio.Group>
      </Form.Item>
      {imgCount > 0 && <Upload
        name="image"
        maxCount={imgCount}
        listType="picture-card"
        showUploadList
        action={'http://geek.itheima.net/v1_0/upload'}
        onChange={onUploadChange}
        fileList={imageList}
      >
        <div style={{ marginTop: 8 }}>
          <PlusOutlined />
        </div>
      </Upload>}
    </Form.Item>
          <Form.Item
        label="内容"
        name="content"
        rules={[{ required: true, message: '请输入文章内容' }]}
      >
        <ReactQuill
          className="publish-quill"
          theme="snow"
          placeholder="请输入文章内容"
        />
      </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish