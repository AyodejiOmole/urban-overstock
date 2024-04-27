import { MenuItem } from 'primereact/menuitem';
import { Steps } from 'primereact/steps';
import React from 'react';

export default function CustomSteps({
  steps,
  activeIndex,
  readOnly = false,
}: {
  steps: MenuItem[];
  activeIndex?: number;
  readOnly?: boolean;
}) {
  return (
    <div className='bg-primary p-8 max-w-3xl mx-auto rounded-2xl'>
      <Steps
        model={steps}
        activeIndex={activeIndex ? activeIndex : undefined}
        readOnly={readOnly}
      />
    </div>
  );
}
