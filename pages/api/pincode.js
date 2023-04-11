export default function handler(req, res) {
  let pincodes = {
    "721303":["Kahragpur","West Bengal"],
    "110003":["Delhi","Delhi"],
    "560017":["Banglore","Karnataka"]
  }
    res.status(200).json(pincodes)
  }
  