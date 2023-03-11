import request from '@/utils/request';
import Link from 'next/link';
import { useRouter } from 'next/router'

type ContentProps = {
  title?: string;
  id?: number;
  desc?: string;
  auther?: string;
  createdTime?: string;
  modifyTime?: string;
  total?: number;
  like?: number;
  content?: string
}

const Content = ({ content, title }: ContentProps) => {
  const router = useRouter()

  return <>
    <p><Link href='/blogs'>返回首页</Link></p>
    {title ? <>
      <h1>{title}</h1>
      <p>
        {content}
      </p>
    </> : <h1>文章不存在</h1>}
  </>
}

export async function getServerSideProps(content: any): Promise<{ props: ContentProps }> {
  const { params: { id } } = content
  // 调用 API 获取博文列表
  if (!id) {
    return {
      props: {}
    }
  }
  const { data } = await request(`/blog/${id}`)
  return {
    props: data,
  }
}

export default Content