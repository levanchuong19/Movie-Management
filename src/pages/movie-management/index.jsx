import {
  Button,
  Form,
  Image,
  Input,
  Modal,
  Popconfirm,
  Select,
  Table,
  Upload,
} from "antd";
import FormItem from "antd/es/form/FormItem";
import axios from "axios";
import { useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import uploadFile from "../../utils/upload";

function MovieManagement() {
  const [form] = useForm();
  const [dataSource, setDataSource] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const handleDeleteMovie = async (id) => {
    console.log("first", id);
    axios.delete(`https://6628fc2b54afcabd0737b666.mockapi.io/Movie/${id}`);

    const listAfterDelete = dataSource.filter((movie) => movie.id !== id);
    setDataSource(listAfterDelete);
  };
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Poster",
      dataIndex: "poster_path",
      key: "poster_path",
      render: (poster_path) => <Image src={poster_path} width={200} />,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: (id) => (
        <>
          <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this task?"
            onConfirm={() => handleDeleteMovie(id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </>
      ),
    },
  ];
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState([
    {
      uid: "-5",
      name: "image.png",
      status: "error",
    },
  ]);
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  const uploadButton = (
    <button
      style={{
        border: 0,
        background: "none",
      }}
      type="button"
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </button>
  );
  async function fetchMovie() {
    const response = await axios.get(
      "https://6628fc2b54afcabd0737b666.mockapi.io/Movie"
    );
    console.log(response.data);
    setDataSource(response.data);
  }
  useEffect(function () {
    fetchMovie();
  }, []);
  function handlOk() {
    form.submit();
  }

  async function handleSubmit(values) {
    console.log(values);
    console.log(values.poster_path.file.originFileObj);
    const url = await uploadFile(values.poster_path.file.originFileObj);
    values.poster_path = url;
    axios.post("https://6628fc2b54afcabd0737b666.mockapi.io/Movie", values);
    setDataSource([...dataSource, values]);
    handleCloseModal();
    form.resetFields();
  }
  function handleShowModal() {
    setIsOpen(true);
  }

  function handleCloseModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <Button
        style={{ marginTop: 100 }}
        type="primary"
        onClick={handleShowModal}
      >
        Add New Movie
      </Button>
      <Table dataSource={dataSource} columns={columns} />
      <Modal
        title=" Add new Movie"
        open={isOpen}
        onCancel={handleCloseModal}
        onOk={handlOk}
      >
        <Form labelCol={{ span: 24 }} form={form} onFinish={handleSubmit}>
          <FormItem label="name" name="name">
            <Input />
          </FormItem>
          <FormItem label="description" name="description">
            <Input.TextArea rows={4} />
          </FormItem>
          <FormItem label="category" name="category">
            <Select
              options={[
                { value: "trending", label: <span>Trending</span> },
                { value: "Comedy", label: <span>Comedy</span> },
                { value: "Action", label: <span>Action</span> },
                { value: "trending", label: <span>Trending</span> },
              ]}
            />
          </FormItem>
          <FormItem label="poster" name="poster_path">
            <Upload
              action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
          </FormItem>
        </Form>
      </Modal>
      {previewImage && (
        <Image
          wrapperStyle={{
            display: "none",
          }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(""),
          }}
          src={previewImage}
        />
      )}
    </div>
  );
}

export default MovieManagement;
