import { Button, Divider, getKeyValue, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Pagination, Popover, PopoverContent, PopoverTrigger, Select, SelectItem, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure } from '@nextui-org/react';
import cryptoRandomString from 'crypto-random-string';
import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { FaLock, FaRegUserCircle, FaUnlockAlt } from 'react-icons/fa';
import { FaKey, FaUser } from 'react-icons/fa6';
import { IoPersonAdd } from 'react-icons/io5';
import { MdDelete, MdEdit, MdEmail } from 'react-icons/md';
import { RiStickyNoteAddFill } from 'react-icons/ri';
import useCreateUserMutation from '../hooks/useCreateUserMutation';
import useDeleteUserMutation from '../hooks/useDeleteUserMutation';
import useUpdatedUserMutation from '../hooks/useUpdateUserMutation';
import { handleCopy } from '../shared';

const rows = [
    {
      key: "1",
      username: "Vignesh M",
      useremail: "vigneshmv2312@gmail.com",
      userpassword: "123456",
      userlevel: new Set(["L2"]),
      userrole: 'user'
    },
    {
        key: "2",
        username: "Venkatesh Ramar",
        useremail: "venkateshramar@gmail.com",
        userpassword: "080295",
        userlevel: new Set(["L1"]),
        userrole: 'user'
    },
    {
        key: "3",
        username: "Shilpa Vignesh",
        useremail: "shilpakr@gmail.com",
        userpassword: "080895",
        userlevel: new Set(["L2"]),
        userrole: 'user'
    },
  ];
  
  const columns = [
    {
      key: "name",
      label: "Name",
    },
    {
      key: "email",
      label: "Email",
    },
    {
      key: "password",
      label: "Password",
    },
    {
        key: "level",
        label: "Level",
    },
    // {
    //     key: "userrole",
    //     label: "User Role",
    // },
    {
        key: "actions",
        label: "Actions",
    }
  ];

  const tableVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 25 },
  };

const UsersTable = ({ users }) => {
    const [page, setPage] = React.useState(1);
    
    // create or update user form fields
    const [ username, setUsername ] = useState('');
    const [ useremail, setUserEmail ] = useState('');
    const [ userpassword, setUserPassword ] = useState('');
    const [ userlevel, setUserLevel ] = useState(new Set(['L1']));

    // variables to have initial values for users
    const [ initialUserName, setInitialUserName ] = useState('');
    const [ initialUserEmail, setInitialUserEmail ] = useState('');
    const [ initialUserPassword, setInitialUserPassword ] = useState('');
    const [ initialUserLevel, setInitialUserLevel ] = useState(new Set(['L1']));
    
    const [ userToDelete, setUserToDelete ] = React.useState(null);
    const [ userKeyToEdit, setUserKeyToEdit ] = React.useState(null);
    const [ editBtnClicked, setEditBtnClicked ] = React.useState(false);

    // state to view / hide password
    const [ showPassword, setShowPassword ] = useState(false);
    const [ showConfirmPassword, setShowConfirmPassword ] = useState(false);

    // mutations to create, update and delete user
    const createUserMutation = useCreateUserMutation();

    const deleteUserMutation = useDeleteUserMutation();

    const updateUserMutation = useUpdatedUserMutation()

    useEffect(() => {
        if (userToDelete) {
          deleteUserMutation.mutate(userToDelete);
          setUserToDelete(null);
        }
    }, [userToDelete])

    // pagination logic
    const rowsPerPage = 10;
    const pages = Math.ceil(users?.length / rowsPerPage);

    const items = React.useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;

        return users?.slice(start, end);
    }, [page, users]);

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();

    const handleEditUser = (event, user) => {
        setUserKeyToEdit(user?.userId);
        setUsername(user.name);
        setUserEmail(user.email);
        setUserPassword(user.password);
        setUserLevel(new Set([user?.level]));
        setEditBtnClicked(true);

        setInitialUserName(user.name);
        setInitialUserEmail(user.email);
        setInitialUserPassword(user.password);
        setInitialUserLevel(new Set([user?.level]));

        onOpen();
    }

    const generateRandomPassword = () => {
      const newPassword = cryptoRandomString({ length: 12, type: 'base64' });
      setUserPassword(newPassword);
    };

    const onCreateOrUpdateUser = () => {
      if(username && useremail && userpassword && userlevel){
        if (editBtnClicked) {
          // check if any of the fields are updated
          if (username === initialUserName && useremail === initialUserEmail && userpassword === initialUserPassword && [...userlevel][0] === [ ...initialUserLevel][0]){
            // no fields are updated, hence return from the method
            onClose();
            return;
          }

          let updatedUser = {
            userId: userKeyToEdit,
          }

          // if the user name is updated, send it in request body
          if (username !== initialUserName) {
            updatedUser = {
              ...updatedUser,
              name: username,
            }
          }

          // if the user mail is updated, send it in request body
          if (useremail !== initialUserEmail) {
            updatedUser = {
              ...updatedUser,
              email: useremail,
            }
          }

          // if the user password is updated, send it in request body
          if (userpassword !== initialUserPassword) {
            updatedUser = {
              ...updatedUser,
              password: userpassword,
            }
          }

          // if the user level is updated, send it in request body
          if ([...userlevel][0] !== [ ...initialUserLevel][0]) {
            updatedUser = {
              ...updatedUser,
              level: [ ...userlevel ][0] || 'L1',
            }
          }

          updateUserMutation?.mutate(updatedUser);
        } else {
            const newUser = {
                name: username,
                email: useremail,
                password: userpassword,
                level: [ ...userlevel ][0] || 'L1',
                role: 'user',
            }

            createUserMutation.mutate(newUser);
        }
        onClose();
        setEditBtnClicked(false);
        resetFormFields();
      } else {
          toast.error('All fields are required');
      }
    }

    const onModalClose = () => {
      setEditBtnClicked(false);
      resetFormFields();
    }

    const resetFormFields = () => {
      setUsername('');
      setUserEmail('');
      setUserPassword('');
      setUserLevel(new Set(['L1']));

      // reset initial values
      setInitialUserName('');
      setInitialUserEmail('');
      setInitialUserPassword('');
      setInitialUserLevel(new Set(['L1']));
    }

    const LockUnlockPassword = () => !showPassword ? (<FaUnlockAlt className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />) : (<FaLock className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />)

    const LockUnlockConfirmPassword = () => !showConfirmPassword ? (<FaUnlockAlt className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />) : (<FaLock className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)} />)

  return (
    <>
      <Toaster position="top-right" />
      <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      transition={{ duration: 0.3 }} className='self-end'>
        <Button onPress={onOpen} className='bg-[#ff6b6b] text-white' startContent={<IoPersonAdd />}>Create User</Button>
      </motion.div>

      <motion.h1
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }} className='text-xl font-semibold px-4'>Users</motion.h1>

        {/* Users Table */}
        <motion.div
          initial={'hidden'}
          animate={'visible'}
          exit={'exit'}
          variants={tableVariants}
          transition={{ duration: 0.5 }}>
          <Table aria-label="Users table" isStriped bottomContent={
              <div className="flex w-full justify-center">
                <Pagination
                  isCompact
                  showControls
                  showShadow
                  color="primary"
                  page={page}
                  total={pages}
                  onChange={(page) => setPage(page)}
                />
              </div>
            }>
              <TableHeader columns={columns}>
              {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
              </TableHeader>
              <TableBody emptyContent={'No users'} items={items}>
              {(item) => (
                  <TableRow key={item?.userId}>
                  {(columnKey) => {
                      if (columnKey === 'actions') {
                          return (
                              <TableCell>
                                  <div className="relative flex items-center gap-2">
                                      <Tooltip content="Copy user's email">
                                          <Button isIconOnly variant='light' color={'success'} onClick={() => handleCopy(item?.email)}>
                                              <span className="text-lg cursor-pointer active:opacity-50">
                                                  <FaUser />
                                              </span>
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Copy user's password">
                                          <Button isIconOnly variant='light' color={'warning'} onClick={() => handleCopy(item?.password)}>
                                              <span className="text-lg cursor-pointer active:opacity-50">
                                                  <FaKey />
                                              </span>
                                          </Button>
                                      </Tooltip>
                                      <Tooltip content="Edit user">
                                          <Button isIconOnly variant='light' color={'primary'} onClick={event => handleEditUser(event, item)}>
                                              <span className="text-lg cursor-pointer active:opacity-50">
                                                  <MdEdit />
                                              </span>
                                          </Button>
                                      </Tooltip>
                                      <Popover placement="right" backdrop='opaque'>
                                          <PopoverTrigger>
                                              <Button isIconOnly variant='light' color='danger'>
                                                  <span className="text-lg cursor-pointer active:opacity-50">
                                                      <MdDelete />
                                                  </span>
                                              </Button>
                                          </PopoverTrigger>
                                          <PopoverContent>
                                              <div className="px-1 py-2 flex flex-col gap-3">
                                                  <div className="text-small font-bold">Are you sure want to delete the user?</div>
                                                  <Button size='sm' className='text-center max-w-16' color='default' onClick={() => setUserToDelete(item?.userId) }>Yes</Button>
                                              </div>
                                          </PopoverContent>
                                      </Popover>
                                  </div>
                              </TableCell>
                          )
                      } else {
                          return <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                      }
                  }}
                  </TableRow>
              )}
              </TableBody>
          </Table>
        </motion.div>
        
        {/* Modal for creating / updating the user */}
        <Modal 
          isOpen={isOpen} 
          onOpenChange={onOpenChange}
          placement="bottom-center"
          onClose={onModalClose}
          scrollBehavior='inside'
        >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-[#ff6b6b]">{ editBtnClicked ? 'Update the user' : 'Create new user' }</ModalHeader>
              <Divider />
              <ModalBody className='my-2 sm:my-4 px-2 sm:px-4'>
                <Input
                    autoFocus
                    endContent={
                        <FaRegUserCircle className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    }
                    label="Username"
                    placeholder="Enter the user's name..."
                    variant="bordered"
                    value={username}
                    onValueChange={setUsername}
                    size='lg'
                    required
                />
                <Input
                  endContent={
                    <MdEmail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter the user's email..."
                  variant="bordered"
                  value={useremail}
                  onValueChange={setUserEmail}
                  size='lg'
                  required
                />
                <Input
                  endContent={
                    <div className='flex justify-center items-center gap-2'>
                      <RiStickyNoteAddFill className='text-2xl text-default-400 flex-shrink-0 cursor-pointer' onClick={generateRandomPassword} />
                      <LockUnlockPassword /> 
                    </div>
                  }
                  label={'Password'}
                  placeholder="Enter the user's password..."
                  type={ showPassword ? 'text' : "password" }
                  variant="bordered"
                  value={userpassword}
                  onValueChange={setUserPassword}
                  size='lg'
                  required
                />
                {/* <Select 
                    label="Select the user's role" 
                    className="" 
                    variant='bordered'
                    value={userrole}
                    onSelectionChange={setUserRole}
                    defaultSelectedKeys={['user']}
                >
                    <SelectItem key={'user'}>
                        User
                    </SelectItem>
                    <SelectItem key={'admin'}>
                        Admin
                    </SelectItem>
                  </Select> */}
                  <Select 
                      label="Select the user's level" 
                      className="" 
                      variant='bordered'
                      selectedKeys={userlevel}
                      onSelectionChange={setUserLevel}
                      defaultSelectedKeys={['L1']}
                      size='lg'
                  >
                    <SelectItem key={'L1'}>
                        L1
                    </SelectItem>
                    <SelectItem key={'L2'}>
                        L2
                    </SelectItem>
                  </Select>
                
              </ModalBody>
              <Divider />
              <ModalFooter>
                <Button className='bg-[#ff6b6b] text-white' onPress={onCreateOrUpdateUser}>
                  { editBtnClicked ? 'Update' : 'Create' }
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
        </Modal>
    </>
  )
}

export default UsersTable