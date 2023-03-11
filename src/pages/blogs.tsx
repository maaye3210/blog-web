
import request from '@/utils/request';
import Link from 'next/link'

type BlogInfo = {
  title: string;
  id: number;
  desc: string;
  auther: string;
  createdTime: string;
  modifyTime: string;
  total: number;
  like: number;
};

type BlogProps = {
  data: BlogInfo[]
}


function Blog({ data }: BlogProps) {
  return (
    <>
      <h1>博客列表</h1>
      <br />
      <ul>
        {
          data.map(({ title, id }) => <li key={id} ><Link href={`content/${id}`}>{title}</Link></li>)
        }
      </ul>
    </>
  )
}


// 此函数在构建时被调用
export async function getServerSideProps(): Promise<{ props: BlogProps }> {
  // 调用 API 获取博文列表
  const { data } = await request('/blog')
  return {
    props: {
      data,
    },
  }
}

export default Blog