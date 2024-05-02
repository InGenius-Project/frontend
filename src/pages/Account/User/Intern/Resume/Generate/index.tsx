import AreaGenerateaModal from '@/components/Area/AreaGenerateModal';
import { setType } from '@/features/generate/generateSlice';
import { useAppDispatch } from '@/features/store';
import { AreaGenType } from '@/types/interfaces/IArea';
import { useEffect } from 'react';

function ResumeGenerate() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setType(AreaGenType.Resume));
  }, [dispatch]);
  return <AreaGenerateaModal />;
}

export default ResumeGenerate;
