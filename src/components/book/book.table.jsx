import { Table } from "antd"
import ViewBookDetail from "./view.book.detail";
import { useState } from "react";

const BookTable = (props) => {

  const { dataBooks, current, setCurrent, pageSize, setPageSize, total, loadBook } = props
  const [dataDetail, setDataDetail] = useState(null)
  const [isDetailOpen, setDetailOpen] = useState(null)

  const columns = [
    {
      title: 'STT',
      dataIndex: '_id',
      render: (_, record, index) => {
        return (
          <div>
            {(current - 1) * pageSize + index + 1}
          </div>
        )
      }
    },
    {
      title: 'Id',
      dataIndex: '_id',
      render: (value, record, index) => {
        return (
          <a href="#"
            onClick={() => {
              setDetailOpen(true);
              setDataDetail(record);
            }}>
            {value}
          </a>
        )
      }
    },
    {
      title: 'Tiêu đề',
      dataIndex: 'mainText',
    },
    {
      title: 'Giá tiền',
      dataIndex: 'price',
      render: (value, record, index) => {
        return (
          <div>
            {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)}
          </div>
        )
      }
    },
    {
      title: 'Số lượng đã bán',
      dataIndex: 'sold',
    },
    {
      title: 'Số lượng',
      dataIndex: 'quantity',
    },
    {
      title: 'Tác giả',
      dataIndex: 'author',
    },
    {
      title: 'Thể loại',
      dataIndex: 'category',
    },
  ];

  const onChange = (pagination, filters, sorter, extra) => {
    if (pagination && pagination.current) {
      if (pagination.current !== current) {
        setCurrent(pagination.current);
      }
      if (pagination.pageSize !== pageSize) {
        setPageSize(pagination.pageSize);
      }
    }
  }

  return (
    <>
      <Table
        columns={columns}
        dataSource={dataBooks}
        rowKey={"_id"}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          total: total,
          showTotal: (total, range) => {
            return (
              <div>
                {range[0]}-{range[1]} trên {total} rows
              </div>
            )
          }
        }}
        onChange={onChange}
      />
      <ViewBookDetail
        loadBook={loadBook}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setDetailOpen={setDetailOpen}
      />
    </>
  )
}

export default BookTable;