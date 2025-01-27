import { Button, Table } from "antd"
import BookDetail from "./book.detail";
import { useEffect, useState } from "react";
import { fetchAllBookAPI } from "../../services/api.service";
import CreateBookControl from "./create.book.control";

const BookTable = () => {

  const [dataBooks, setDataBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    loadBook();
  }, [current, pageSize])

  const loadBook = async () => {
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBooks(res.data.result);
      setTotal(res.data.meta.total);
    }
  }

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setDetailOpen] = useState(null);
  const [isCreateOpen, setCreateOpen] = useState(false)

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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h3>Table Book</h3>
        <Button
          onClick={() => setCreateOpen(true)}
          type="primary"> Create Book </Button>
      </div>
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
      <BookDetail
        loadBook={loadBook}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setDetailOpen={setDetailOpen}
      />
      <CreateBookControl
        loadBook={loadBook}
        isCreateOpen={isCreateOpen}
        setCreateOpen={setCreateOpen}
      />
    </>
  )
}

export default BookTable;