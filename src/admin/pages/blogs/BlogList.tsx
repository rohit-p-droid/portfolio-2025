import React from 'react';
import Card from '../../components/Card/Card';
import { DataTable } from '../../components';

const BlogList: React.FC = () => {

  return (
    <>
     <Card title='Blogs'>
      <div>
        <DataTable

        />
      </div>
     </Card>
    </>
  )
}

export default BlogList;