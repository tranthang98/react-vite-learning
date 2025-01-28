import { Button, notification, Popconfirm, Table } from "antd"
import BookDetail from "./book.detail";
import { useCallback, useEffect, useState } from "react";
import { deleteBookAPI, fetchAllBookAPI } from "../../services/api.service";
import CreateBookControl from "./create.book.control";
import CreateBookUncontrol from "./create.book.uncontrol";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import UpdateBookControl from "./update.book.control";
import UpdateBookUncontrol from "./update.book.uncontrol";

const BookTable = () => {

  const [dataBooks, setDataBooks] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [dataDetail, setDataDetail] = useState(null);
  const [isDetailOpen, setDetailOpen] = useState(null);
  const [isCreateOpen, setCreateOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState(null);
  const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);

  const [loadingTable, setLoadingTable] = useState(false);

  // useEffect(() => {
  //   loadBook();
  // }, [current, pageSize])

  // fix eslint by useCallback
  const loadBook = useCallback(async () => {
    setLoadingTable(true);
    const res = await fetchAllBookAPI(current, pageSize);
    if (res.data) {
      setDataBooks(res.data.result);
      setTotal(res.data.meta.total);
    }
    setLoadingTable(false);
  }, [current, pageSize])

  useEffect(() => {
    loadBook();
  }, [loadBook])

  const handleDeleteUser = async (id) => {
    const res = await deleteBookAPI(id);
    if (res.data) {
      notification.success({
        message: "Delete book",
        description: "Xóa book thành công"
      })
      if ((total - 1) % pageSize === 0) {
        setCurrent(current - 1);
      } else {
        await loadBook();
      }
    } else {
      notification.error({
        message: "Error delete book",
        description: JSON.stringify(res.message)
      })
    }
  }

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
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <div style={{ display: "flex", gap: "20px" }}>
          <EditOutlined
            onClick={() => {
              setDataUpdate(record);
              setIsModalUpdateOpen(true);
            }}
            style={{ cursor: "pointer", color: "orange" }}
          />
          <Popconfirm
            title="Xóa book"
            description="Bạn chắc chắn xóa book này ?"
            onConfirm={() => handleDeleteUser(record._id)}
            okText="Yes"
            cancelText="No"
            placement="left"
          >
            <DeleteOutlined style={{ cursor: "pointer", color: "red" }} />
          </Popconfirm>
        </div>
      )
    }
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
        loading={loadingTable}
      />
      <BookDetail
        loadBook={loadBook}
        dataDetail={dataDetail}
        setDataDetail={setDataDetail}
        isDetailOpen={isDetailOpen}
        setDetailOpen={setDetailOpen}
      />
      {/* <CreateBookControl
        loadBook={loadBook}
        isCreateOpen={isCreateOpen}
        setCreateOpen={setCreateOpen}
      /> */}
      <CreateBookUncontrol
        loadBook={loadBook}
        isCreateOpen={isCreateOpen}
        setCreateOpen={setCreateOpen}
      />
      {/* <UpdateBookControl
        loadBook={loadBook}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
      /> */}
      <UpdateBookUncontrol
        loadBook={loadBook}
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
        isModalUpdateOpen={isModalUpdateOpen}
        setIsModalUpdateOpen={setIsModalUpdateOpen}
      />
    </>
  )
}

export default BookTable;