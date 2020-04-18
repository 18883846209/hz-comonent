import React from "react";
import PropTypes from "prop-types";
import { PullToRefresh } from "antd-mobile";
import { EmptyNoDataPage, LoadingPage } from "@/components/EmptyPage";
import Loading from "@/components/PullLoading";

const Empty = ({ loading = true, data = [], refresh, onRefresh }) => {
  if (loading) return <LoadingPage />;
  if (!data.length)
    return (
      <PullToRefresh
        damping={30}
        indicator={{ activate: <Loading />, release: <Loading /> }}
        refresh={refresh}
        onRefresh={onRefresh}
      >
        <EmptyNoDataPage />
      </PullToRefresh>
    );
  return null;
};

Empty.propTypes = {
  loading: PropTypes.bool,
  data: PropTypes.array,
  refresh: PropTypes.bool,
  onRefresh: PropTypes.func
};

export default Empty;
