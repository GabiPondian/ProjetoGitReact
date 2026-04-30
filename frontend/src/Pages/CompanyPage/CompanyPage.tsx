import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getCompanyProfile } from '../../api';
import { CompanyProfile } from '../../company';

interface Props {
    
}

const CompanyPage = (props: Props) => {
      let { ticker } = useParams();
  const [company, setCompany] = useState<CompanyProfile>();

  useEffect(() => {
  const getProfileInit = async () => {
    const result = await getCompanyProfile(ticker!);
    setCompany(result);
  };
  getProfileInit();
}, [ticker]);

  return (
    <>
      {company ? (
        <div className="company-profile-container">{company.companyName}</div>
      ) : (
        <div>Company Not Found!</div>
      )}
    </>
  );
}

export default CompanyPage
