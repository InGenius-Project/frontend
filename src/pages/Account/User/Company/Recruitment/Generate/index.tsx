import AreaGenerateaModal from '@/components/Area/AreaGenerateModal';
import { setType } from '@/features/generate/generateSlice';
import { useAppDispatch } from '@/features/store';
import { AreaGenType } from '@/types/interfaces/IArea';
import React, { useEffect } from 'react';

function CompanyRecruitmentGenerat() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setType(AreaGenType.Recruitment));
  }, [dispatch]);

  return <AreaGenerateaModal />;
}

export default CompanyRecruitmentGenerat;
