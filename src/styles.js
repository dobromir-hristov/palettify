export const boxShadow = {
  opacities: [0.2, 0.2],
  dynamicStyles: {
    boxShadow: `0 2px 2px {{rgba.0}}, 0 4px 4px {{rgba.0}}, 0 8px 8px {{rgba.0}}, 0 16px 16px {{rgba.0}}, 0 32px 32px {{rgba.1}}, 0 64px 64px {{rgba.1}}`
  }
}

export const popoverBackground = {
  staticStyles: {
    backgroundColor: '{{rgb.0}}',
    color: '{{contrastColors.0}}'
  }
}

export const border = {
  staticStyles: {
    border: '10px solid {{rgb.0}}',
    borderWidth: '10px',
    padding: '10px'
  },
  dynamicStyles: {
    transform: 'scale(1.08)',
    borderWidth: '0px',
    margin: '10px'
  }
}
