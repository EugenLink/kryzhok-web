import { Table } from "antd";
import { useEffect, useState } from "react";
import styles from "./Creator.module.scss";

const columns = [
  {
    title: "Вопрос",
    dataIndex: "text",
  },
  {
    title: "Инициалы",
    dataIndex: "initials",
  },
  {
    title: "Телефон",
    dataIndex: "phone",
  },
  {
    title: "Город",
    dataIndex: "city",
  },
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Дата",
    dataIndex: "date",
  },
];

export const FeedBackControl = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  useEffect(() => {
    fetch(
      `https://u1978287.isp.regruhosting.ru/kryzhok/controls/getFeedback.php`
    )
      .then((res) => res.json())
      .then((res) => {
        let initData = res.map((el) => ({
          key: el[0],
          initials: el[2],
          phone: el[4],
          date: el[1],
          text: el[6],
          city: el[5],
          email: el[3],
          checked: el[7],
        }));
        setData(initData);
        setSelectedRowKeys(
          initData.map((el) => (el.checked == "1" ? el.key : null))
        );
      });
  }, []);
  const onSelectTest = (record, s) => {
    const selectId = record["key"];
    fetch(
      `https://u1978287.isp.regruhosting.ru/kryzhok/controls/setFeedbackCheked.php?id=${selectId}&value=${
        s ? "1" : "0"
      }`
    );
  };
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    onSelect: onSelectTest,
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={styles.wrapper} style={{ marginTop: 20 }}>
      <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    </div>
  );
};
