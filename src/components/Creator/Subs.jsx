import { Table } from "antd";
import { useEffect, useState } from "react";
import styles from "./Creator.module.scss";

const columns = [
  {
    title: "Email",
    dataIndex: "email",
  },
  {
    title: "Дата",
    dataIndex: "date",
  },
];

export const SubsControl = () => {
  const [data, setData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  useEffect(() => {
    fetch(`https://u1978287.isp.regruhosting.ru/kryzhok/controls/getSubs.php`)
      .then((res) => res.json())
      .then((res) => {
        let initData = res.map((el) => ({
          key: el[0],
          date: el[2],
          email: el[1],
          checked: el[3],
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
      `https://u1978287.isp.regruhosting.ru/kryzhok/controls/setCheckedSubs.php?id=${selectId}&value=${
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
