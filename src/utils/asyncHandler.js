// try catch varient
export default function asyncHandler(requestHandler) {
    async (req, res, next) => {
        try {
            await requestHandler(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

// promise varient
// export default asyncHandler = (requestHandler) => {
//     (req, res, next) => {
//         Promise
//             .resolve(requestHandler(req, res, next))
//             .catch(err => next(err));
//     }
// }