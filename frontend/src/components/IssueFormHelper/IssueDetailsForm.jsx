function IssueDetailsForm({
  issuedTo,
  setIssuedTo,
  department,
  setDepartment,
  remark,
  setRemark,
}) {
  return (
    <>
      {/* Issued To */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Issued To <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={issuedTo}
          onChange={(e) => setIssuedTo(e.target.value)}
          className="w-full border rounded-lg p-3"
          placeholder="Enter employee name"
          required
        />
      </div>

      {/* Department */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">
          Department <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full border rounded-lg p-3"
          placeholder="Enter department"
          required
        />
      </div>

      {/* Remark */}

      <div>
        <label className="block mb-2 font-medium text-gray-700">Remark</label>

        <textarea
          value={remark}
          onChange={(e) => setRemark(e.target.value)}
          rows="4"
          className="w-full border rounded-lg p-3"
          placeholder="Optional remarks"
        />
      </div>
    </>
  );
}

export default IssueDetailsForm;
