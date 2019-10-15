import React from 'react';

export default function authorizedFeature() {
  return (
    <div>
      This feature is protected using the withAuthorization HOC...
      which means you cannot read this unless your user&#39;s role has the correct permissions
    </div>
  );
}
