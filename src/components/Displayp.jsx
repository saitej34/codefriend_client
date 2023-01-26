import React from 'react'

const Displayp = () => {
  return (
    <div>
        <div class="alert alert-warning" role="alert">
            <strong>Hey User! Password is Incorrect</strong>
            <p>Regenerate Password at <a href="/reset">Link</a></p>
        </div>
    </div>
  )
}

export default Displayp
